import { Model, model, models, Schema } from 'mongoose';

export interface SubscriptionsSchema {
  _id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<SubscriptionsSchema>(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email.'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email is invalid',
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Subscription: Model<SubscriptionsSchema> =
  models.subscriptions ?? model('subscriptions', subscriptionSchema);

export default Subscription;
