import { Document, Types } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { DateFormatService } from 'src/utils/services/date-format.service';

@Schema()
export default class User extends Document {
    @Prop({
        unique: true,
        index: true,
    })
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop({
        default: null,
    })
    deletedAt: string;

    @Prop({
        default: DateFormatService.getFormatDateForPersistenceEnvironment(),
    })
    createdAt: string;

    @Prop({
        default: DateFormatService.getFormatDateForPersistenceEnvironment(),
    })
    updatedAt: string;

    @Prop({ type: Types.ObjectId, ref: 'Business' })
    businessId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
    transform: (document, user) => {
        user.id = user._id;
        user.business = user.businessId;
        delete user['_id'];
        delete user['__v'];
        delete user['password'];
        delete user['deletedAt'];
        delete user['businessId'];
        return user;
    },
});
