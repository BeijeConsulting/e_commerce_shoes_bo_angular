import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CheckboxInput } from 'src/app/classes/forms/CheckboxInput';
import { DateInput } from 'src/app/classes/forms/DateInput';
import { ImagePicker } from 'src/app/classes/forms/ImagePicker';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { MultiLine } from 'src/app/classes/forms/MultiLineInput';
import { PasswordInput } from 'src/app/classes/forms/PasswordInput';
import { SelectInput } from 'src/app/classes/forms/SelectInput';
import { TextInput } from 'src/app/classes/forms/TextInput';
import { DataCoupon } from 'src/app/interfaces/CouponData';
import { PersonalAddressData } from 'src/app/interfaces/PersonalAddressData';
import { PersonalUserData } from 'src/app/interfaces/PersonalUserData';
import { ProductData } from 'src/app/interfaces/ProductData';
import { UserData } from 'src/app/interfaces/UserData';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  // TODO: get from a remote source of question metadata
  editUserForm(userData: UserData): Observable<InputBase<string>[]> {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'id',
        label: 'Id',
        required: true,
        value: userData.id,
        order: 1,
        readonly: true,
      }),

      new TextInput({
        key: 'lastName',
        label: 'lastName',
        required: true,
        value: userData.lastName,
        order: 2,
      }),

      new TextInput({
        key: 'firstName',
        label: 'firstName',
        required: true,
        value: userData.firstName,
        order: 3,
      }),

      new TextInput({
        key: 'phoneNumber',
        label: 'phoneNumber',
        required: true,
        value: userData.phoneNumber,
        order: 4,
        regexControl: /^\d+$/,
      }),

      new TextInput({
        key: 'email',
        label: 'email',
        required: true,
        value: userData.email,
        order: 5,
        regexControl: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
      }),

      new DateInput({
        key: 'date',
        label: 'date',
        value: new Date(userData.birthDate), // La stringa deve essere MM/DD/YYYY
        required: true,
        order: 6,
      }),

      new SelectInput({
        required: true,
        key: 'role',
        label: 'role',
        value: userData.role,
        options: [
          { key: 'ADMIN', value: 'Admin' },
          { key: 'USER', value: 'User' },
          { key: 'DATA_ENTRY', value: 'Data Entry' },
          { key: 'MARKETING', value: 'Marketing' },
        ],
        order: 7,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  addUserForm(): Observable<InputBase<string>[]> {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'lastName',
        label: 'lastName',
        required: true,
        value: '',
        order: 2,
      }),

      new TextInput({
        key: 'firstName',
        label: 'firstName',
        required: true,
        value: '',
        order: 3,
      }),

      new TextInput({
        key: 'phoneNumber',
        label: 'phoneNumber',
        required: true,
        value: '',
        order: 4,
        regexControl: /^\d+$/,
      }),

      new TextInput({
        key: 'email',
        label: 'email',
        required: true,
        value: '',
        order: 5,
        regexControl: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
      }),

      new PasswordInput({
        key: 'password',
        label: 'Password',
        required: true,
        value: '',
        order: 6,
        regexControl:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/,
      }),

      new DateInput({
        key: 'date',
        label: 'date',
        value: '', // La stringa deve essere MM/DD/YYYY
        required: true,
        order: 6,
      }),

      new SelectInput({
        required: true,
        key: 'role',
        label: 'role',
        value: '',
        options: [
          { key: 'admin', value: 'Admin' },
          { key: 'dataEntry', value: 'Data Entry' },
          { key: 'marketing', value: 'Marketing' },
        ],
        order: 7,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  addProductForm(): Observable<InputBase<string>[]> {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'productName',
        label: 'Product Name',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'brand',
        label: 'Brand',
        required: true,
        value: '',
        order: 2,
      }),

      new TextInput({
        key: 'color',
        label: 'Color',
        required: true,
        value: '',
        order: 3,
      }),

      new TextInput({
        key: 'startingPrice',
        label: 'Starting Price',
        required: true,
        value: '',
        order: 4,
      }),

      new TextInput({
        key: 'listedPrice',
        label: 'Listed Price',
        required: true,
        value: '',
        order: 5,
      }),

      new TextInput({
        key: 'type',
        label: 'Type',
        required: true,
        value: '',
        order: 6,
      }),

      new MultiLine({
        key: 'italianDescription',
        label: 'Italian Description',
        required: true,
        value: '',
        order: 7,
      }),

      new MultiLine({
        key: 'englishDescription',
        label: 'English Description',
        required: true,
        value: '',
        order: 8,
      }),

      new TextInput({
        key: 'category',
        label: 'Category',
        required: true,
        value: '',
        order: 9,
      }),

      new TextInput({
        key: 'size',
        label: 'Size',
        required: true,
        value: '',
        order: 10,
      }),

      new TextInput({
        key: 'quantity',
        label: 'Quantity',
        required: true,
        value: '',
        order: 11,
      }),

      new TextInput({
        key: 'sellingPrice',
        label: 'Selling Price',
        required: true,
        value: '',
        order: 12,
      }),

      new ImagePicker(
        {
          key: 'productImagePicker',
          label: 'Product Images',
          required: true,
          value: '',
          order: 12,
        },
        { minNumber: 3 }
      ),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  editProductForm(productData: ProductData): Observable<InputBase<string>[]> {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'productName',
        label: 'Product Name',
        required: true,
        value: productData.productName,
        order: 1,
      }),

      new TextInput({
        key: 'brand',
        label: 'Brand',
        required: true,
        value: productData.brand,
        order: 2,
      }),

      new TextInput({
        key: 'color',
        label: 'Color',
        required: true,
        value: productData.colour ? productData.colour : '',
        order: 3,
      }),

      new TextInput({
        key: 'listedPrice',
        label: 'Listed Price',
        required: true,
        value: productData.listedPrice,
        order: 5,
      }),

      new TextInput({
        key: 'type',
        label: 'Type',
        required: true,
        value: productData.type ? productData.type : '',
        order: 6,
      }),

      new MultiLine({
        key: 'italianDescription',
        label: 'Italian Description',
        required: true,
        value: productData.italianDescription
          ? productData.italianDescription
          : '',
        order: 7,
      }),

      new MultiLine({
        key: 'englishDescription',
        label: 'English Description',
        required: true,
        value: productData.englishDescription
          ? productData.englishDescription
          : '',
        order: 8,
      }),

      new TextInput({
        key: 'category',
        label: 'Category',
        required: true,
        value: productData.category ? productData.category : '',
        order: 9,
      }),

      new TextInput({
        key: 'size',
        label: 'Size',
        required: true,
        value: productData.size ? productData.size : '',
        order: 10,
      }),

      new TextInput({
        key: 'quantity',
        label: 'Quantity',
        required: true,
        value: productData.quantity ? productData.quantity : '',
        order: 11,
      }),

      new TextInput({
        key: 'images',
        label: 'Images',
        required: false,
        value: productData.images,
        order: 13,
      }),

      new TextInput({
        key: 'productId',
        label: 'ID',
        required: true,
        value: productData.id,
        order: 14,
      }),

      new CheckboxInput({
        key: 'isPresent',
        label: 'Is Present',
        required: false,
        value: '',
        order: 15,
      }),

      //AGGIUNGERE IMAGE PICKER
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  addCouponForm(): Observable<InputBase<string>[]> {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'code',
        label: 'Code',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'value',
        label: 'Value',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'maxUsage',
        label: 'Max Usage',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'userId',
        label: 'User Id',
        required: false,
        value: '',
        order: 1,
      }),

      new DateInput({
        key: 'expirationDate',
        label: 'Expiration Date',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'type',
        label: 'Type',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'minOrder',
        label: 'Minimum Order',
        required: true,
        value: '',
        order: 1,
      }),

      new MultiLine({
        key: 'italianDescription',
        label: 'Italian Description',
        required: false,
        value: '',
        order: 1,
      }),

      new MultiLine({
        key: 'englishDescription',
        label: 'English Description',
        required: false,
        value: '',
        order: 1,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  editCouponForm(dataCoupon: DataCoupon): Observable<InputBase<string>[]> {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'code',
        label: 'Code',
        required: true,
        value: dataCoupon.code,
        order: 1,
      }),

      new TextInput({
        key: 'value',
        label: 'Value',
        required: true,
        value: dataCoupon.value,
        order: 1,
      }),

      new TextInput({
        key: 'maxUsage',
        label: 'Max Usage',
        required: true,
        value: dataCoupon.maxUsage,
        order: 1,
      }),

      new TextInput({
        key: 'userId',
        label: 'User Id',
        required: false,
        value: dataCoupon.userId ? dataCoupon.userId : '',
        order: 1,
      }),

      new DateInput({
        key: 'expirationDate',
        label: 'Expiration Date',
        required: true,
        value: new Date(dataCoupon.expirationDate),
        order: 1,
      }),

      new TextInput({
        key: 'type',
        label: 'Type',
        required: true,
        value: dataCoupon.type,
        order: 1,
      }),

      new TextInput({
        key: 'minOrder',
        label: 'Minimum Order',
        required: true,
        value: dataCoupon.minOrder,
        order: 1,
      }),

      new MultiLine({
        key: 'italianDescription',
        label: 'Italian Description',
        required: true,
        value: dataCoupon.italianDescription,
        order: 1,
      }),

      new MultiLine({
        key: 'englishDescription',
        label: 'English Description',
        required: true,
        value: dataCoupon.englishDescription,
        order: 1,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  addOrderForm(): Observable<InputBase<string>[]> {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'paymentState',
        label: 'Payment State',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'addressId',
        label: 'Address ID',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'name',
        label: 'name',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'state',
        label: 'State',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'transaction',
        label: 'Transaction',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'userId',
        label: 'User ID',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'couponId',
        label: 'Coupon ID',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'searchProducById',
        label: 'Search Product By ID',
        required: true,
        value: '',
        order: 1,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  editOrderForm(orderData: {
    status: string;
  }): Observable<InputBase<string>[]> {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'status',
        label: 'Status',
        required: true,
        value: orderData.status,
        order: 1,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  editPersonalDataForm(
    personalUserData: PersonalUserData
  ): Observable<InputBase<string>[]> {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'firstName',
        label: 'First Name',
        required: true,
        value: personalUserData.firstName,
        order: 1,
      }),
      new TextInput({
        key: 'lastName',
        label: 'Last Name',
        required: true,
        value: personalUserData.lastName,
        order: 1,
      }),
      new TextInput({
        key: 'email',
        label: 'Email',
        required: true,
        value: personalUserData.email,
        order: 1,
      }),
      new PasswordInput({
        key: 'password',
        label: 'Password',
        required: true,
        value: personalUserData.password,
        order: 1,
        regexControl:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/,
      }),
      new DateInput({
        key: 'birthDate',
        label: 'Birth Date',
        required: true,
        value: new Date(personalUserData.birthDate),
        order: 1,
      }),
      new TextInput({
        key: 'phoneNumber',
        label: 'Phone Number',
        required: true,
        value: personalUserData.phoneNumber,
        order: 1,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  personalAddressForm(
    personalAddreddData?: PersonalAddressData
  ): Observable<InputBase<string>[]> {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'label',
        label: 'Label',
        required: true,
        value: personalAddreddData?.label,
        order: 1,
      }),

      new TextInput({
        key: 'fullName',
        label: 'Full Name',
        required: true,
        value: personalAddreddData?.fullName,
        order: 1,
      }),

      new TextInput({
        key: 'address',
        label: 'Address',
        required: true,
        value: personalAddreddData?.address,
        order: 1,
      }),

      new TextInput({
        key: 'zipCode',
        label: 'Zip Code',
        required: true,
        value: personalAddreddData?.zipCode,
        order: 1,
      }),

      new TextInput({
        key: 'phoneNumber',
        label: 'Phone Number',
        required: true,
        value: personalAddreddData?.phoneNumber,
        order: 1,
      }),

      new TextInput({
        key: 'country',
        label: 'Country',
        required: true,
        value: personalAddreddData?.country,
        order: 1,
      }),

      new MultiLine({
        key: 'instuctions',
        label: 'Instructions',
        required: false,
        value: personalAddreddData?.instructions,
        order: 1,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
