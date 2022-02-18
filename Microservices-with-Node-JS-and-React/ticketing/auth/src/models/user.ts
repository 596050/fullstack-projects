import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build: (attrs: UserAttrs) => UserDocument;
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
