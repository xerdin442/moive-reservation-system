export type MovieGenre =
  | 'action'
  | 'romance'
  | 'thriller'
  | 'crime'
  | 'noir'
  | 'historical'
  | 'western'
  | 'adventure'
  | 'fantasy'
  | 'documentary'
  | 'animation'
  | 'sci-fi'
  | 'futuristic'
  | 'musical'
  | 'comedy'
  | 'drama'
  | 'epic'
  | 'horror'
  | 'others';

export type MovieRating =
  | 'parental-guidance'
  | 'x-rated'
  | 'general'
  | 'thirteen-plus';

export type PremiereStatus = 'upcoming' | 'showing' | 'ended';

export type Chain = 'base' | 'solana';
export type TransactionStatus = 'pending' | 'success' | 'failed';
export type TransactionMethod = 'crypto' | 'fiat';
export type TransactionType = 'deposit' | 'withdrawal';

export type AdminRole = 'staff' | 'manager' | 'super-admin';
