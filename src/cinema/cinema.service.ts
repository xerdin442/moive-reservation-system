import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cinema, CinemaDocument } from '@src/schema/cinema.schema';
import { Screen } from '@src/schema/screen.schema';
import { Model } from 'mongoose';
import { ChangeEmailDTO, LoginDTO, SignupDTO } from './dto';
import { randomUUID } from 'crypto';
import * as speakeasy from 'speakeasy';
import * as qrCode from 'qrcode';
import { Secrets } from '@src/common/secrets';
import { RedisClientType } from 'redis';
import { connectToRedis } from '@src/common/config/redis';
import { sendEmail } from '@src/common/config/mail';

@Injectable()
export class CinemaService {
  constructor(
    @InjectModel(Cinema.name) private readonly cinemaModel: Model<Cinema>,
    @InjectModel(Screen.name) private readonly screenModel: Model<Screen>,
  ) {}

  async signup(dto: SignupDTO): Promise<string> {
    try {
      // **Verify account details

      // Check if cinema profile exists with given email address
      const existingCinema = await this.cinemaModel
        .findOne({ email: dto.email })
        .exec();

      if (existingCinema) {
        throw new BadRequestException('Account with this email already exists');
      }

      // Generate MFA secret
      const secret = speakeasy.generateSecret({
        name: `${Secrets.APP_NAME}:${dto.email}`,
      });

      // Create new cinema profile
      const newCinema = new this.cinemaModel({
        ...dto,
        apiKey: `key-${randomUUID().split('-').join('')}`,
        mfaSecret: secret.base32,
      });
      await newCinema.save();

      // Create a QRcode image with the generated secret
      return qrCode.toDataURL(secret.otpauth_url as string, {
        errorCorrectionLevel: 'high',
      });
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginDTO): Promise<CinemaDocument> {
    try {
      // Check if cinema profile exists with given email address
      const cinema = await this.cinemaModel
        .findOne({ email: dto.email })
        .exec();

      if (!cinema) {
        throw new BadRequestException(
          'No account found with that email address',
        );
      }

      // Verify MFA code
      const mfaCheck = speakeasy.totp.verify({
        secret: cinema.mfaSecret,
        token: dto.mfaCode,
        encoding: 'base32',
      });

      if (!mfaCheck) {
        throw new BadRequestException('Invalid MFA code. Please try again!');
      }

      return cinema;
    } catch (error) {
      throw error;
    }
  }

  async resetApiKey(cinemaId: string): Promise<void> {
    try {
      // Generate new API key and update the cinema profile
      await this.cinemaModel
        .findByIdAndUpdate(
          cinemaId,
          { apiKey: `key-${randomUUID().split('-').join('')}` },
          { new: true },
        )
        .exec();

      return;
    } catch (error) {
      throw error;
    }
  }

  async toggleCryptoTransactions(
    apiKey: string,
    mode: 'on' | 'off',
  ): Promise<void> {
    try {
      if (mode === 'on') {
        await this.cinemaModel
          .updateOne({ apiKey }, { usdcTransactions: true })
          .exec();

        return;
      } else {
        await this.cinemaModel
          .updateOne({ apiKey }, { usdcTransactions: false })
          .exec();
      }

      return;
    } catch (error) {
      throw error;
    }
  }

  async changeEmail(dto: ChangeEmailDTO): Promise<void> {
    const redis: RedisClientType = await connectToRedis(
      Secrets.REDIS_URL,
      'Email Change',
      Secrets.EMAIL_CHANGE_STORE_INDEX,
    );

    try {
      // Generate and store verification code for one hour
      const verificationCode = `${Math.random() * 10 ** 16}`.slice(3, 9);
      await redis.setEx(
        verificationCode,
        3600,
        JSON.stringify({ status: 'ACTIVE' }),
      );

      const content = `You requested for a change of email. Verify your request with this code: ${verificationCode}. This code is valid for one hour.`;
      await sendEmail(dto.email, 'Verification Code', content);

      return;
    } catch (error) {
      throw error;
    } finally {
      redis.destroy();
    }
  }

  async resendVerificationCode(dto: ChangeEmailDTO): Promise<void> {}

  async confirmEmailChange(): Promise<void> {
    const redis: RedisClientType = await connectToRedis(
      Secrets.REDIS_URL,
      'Email Change',
      Secrets.EMAIL_CHANGE_STORE_INDEX,
    );

    try {
      // Generate and store verification code for one hour
      const verificationCode = `${Math.random() * 10 ** 16}`.slice(3, 9);
      await redis.setEx(
        verificationCode,
        3600,
        JSON.stringify({ status: 'ACTIVE' }),
      );

      const content = `You requested for a change of email. Verify your request with this code: ${verificationCode}. This code is valid for one hour.`;
      await sendEmail(dto.email, 'Verification Code', content);

      return;
    } catch (error) {
      throw error;
    } finally {
      redis.destroy();
    }
  }

  async getProfile() {}

  async updateProfile() {}

  async createScreen() {}

  async updateScreen() {}

  async deleteScreen() {}
}
