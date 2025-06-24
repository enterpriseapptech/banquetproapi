/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsImageFile(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        name: 'isImageFile',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (!value || typeof value !== 'object') return false;
            const mimetype = (value as Express.Multer.File).mimetype;
            return (
              typeof mimetype === 'string' &&
              ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(mimetype)
            );
          },
          defaultMessage(args: ValidationArguments) {
            return 'File must be a valid image (jpeg, png, webp)';
          },
        },
      });
    };
  }
  

  export class ImageUploadDto {
  @IsImageFile({ message: 'Each file must be a valid image (jpeg, png, jpg, webp)' })
  file: Express.Multer.File;
}