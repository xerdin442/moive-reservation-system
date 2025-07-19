import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignupDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  acctNumber: string;

  @IsString()
  @IsNotEmpty()
  acctName: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;
}

export class LoginDTO {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  mfaCode: string;
}

export class ChangeEmailDTO {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty()
  email: string;
}

export class ConfirmNewEmailDTO {
  @IsString()
  @IsNotEmpty()
  confirmationCode: string;
}

export class UpdateProfileDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  acctNumber?: string;

  @IsString()
  @IsOptional()
  acctName?: string;

  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsOptional()
  solWallet?: string;

  @IsString()
  @IsOptional()
  ethWallet?: string;
}

export class CreateScreenDTO {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  numberOfSeats: string;
}

export class UpdateScreenDTO {
  @IsString()
  @IsOptional()
  identifier?: string;

  @IsString()
  @IsOptional()
  numberOfSeats?: string;
}
