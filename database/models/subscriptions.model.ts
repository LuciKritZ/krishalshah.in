import { Model, model, models, Schema } from 'mongoose';

export interface SubscriptionsSchema {
  _id: string;
  createdAt: Date;
  email: string;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<SubscriptionsSchema>(
  {
    email: {
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email is invalid',
      ],
      required: [true, 'Please provide an email.'],
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription: Model<SubscriptionsSchema> =
  models.subscriptions ?? model('subscriptions', subscriptionSchema);

export default Subscription;
