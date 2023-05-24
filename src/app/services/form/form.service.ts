import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CheckboxInput } from 'src/app/classes/forms/CheckboxInput';
import { DateInput } from 'src/app/classes/forms/DateInput';
import { ImagePicker } from 'src/app/classes/forms/ImagePicker';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { MultiLine } from 'src/app/classes/forms/MultiLineInput';
import { OrderInput } from 'src/app/classes/forms/OrderInput';
import { PasswordInput } from 'src/app/classes/forms/PasswordInput';
import { SelectInput } from 'src/app/classes/forms/SelectInput';
import { TextInput } from 'src/app/classes/forms/TextInput';
import { DataCoupon } from 'src/app/interfaces/CouponData';
import { PersonalAddressData } from 'src/app/interfaces/PersonalAddressData';
import { PersonalUserData } from 'src/app/interfaces/PersonalUserData';
import { ProductData } from 'src/app/interfaces/ProductData';
import { UserData } from 'src/app/interfaces/UserData';
import { AddProductSizeInput } from 'src/app/classes/forms/AddProductSizeInput';

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

  addProductForm(
    sizes: any,
    brands: any,
    colors: any,
    categories: any
  ): Observable<InputBase<string>[]> {
    const formattedSizes = sizes.map((item: string) => {
      return { key: item, value: item };
    });

    const formattedBrands = brands.map((item: any) => {
      return { key: item.code, value: item.brand };
    });

    const formattedColors = colors.map((item: any) => {
      return { key: item.code, value: item.color };
    });

    const formattedCategories = categories.map((item: any) => {
      return { key: item.code, value: item.category };
    });

    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'name',
        label: 'name',
        required: true,
        value: '',
        order: 1,
      }),

      new SelectInput({
        required: true,
        key: 'brand',
        label: 'brand',
        value: '',
        options: formattedBrands,
        order: 2,
      }),

      new SelectInput({
        required: true,
        key: 'color',
        label: 'color',
        value: '',
        options: formattedColors,
        order: 3,
      }),

      new TextInput({
        key: 'startingPrice',
        label: 'startingPrice',
        required: true,
        value: '',
        order: 4,
      }),

      new TextInput({
        key: 'listedPrice',
        label: 'listedPrice',
        required: true,
        value: '',
        order: 5,
      }),

      new SelectInput({
        required: true,
        key: 'type',
        label: 'type',
        value: '',
        options: [
          { key: 'M', value: 'M' },
          { key: 'W', value: 'W' },
        ],
        order: 6,
      }),

      new MultiLine({
        key: 'descriptionIt',
        label: 'descriptionIt',
        required: true,
        value: '',
        order: 7,
      }),

      new MultiLine({
        key: 'descriptionEng',
        label: 'descriptionEn',
        required: true,
        value: '',
        order: 8,
      }),

      new SelectInput({
        required: true,
        key: 'category',
        label: 'category',
        value: '',
        options: formattedCategories,
        order: 9,
      }),

      new AddProductSizeInput({
        key: 'productDetails',
        required: true,
        value: '',
        order: 10,
        options: formattedSizes,
      }),

      new ImagePicker(
        {
          key: 'productImages',
          label: 'Product Images',
          required: true,
          value: '',
          order: 11,
        },
        { minNumber: 3 }
      ),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }

  editProductForm(
    productObj: any,
    sizes: any,
    brands: any,
    colors: any,
    categories: any
  ): Observable<InputBase<string>[]> {
    const formattedSizes = sizes.map((item: string) => {
      return { key: item, value: item };
    });

    const formattedBrands = brands.map((item: any) => {
      return { key: item.code, value: item.brand };
    });

    const formattedColors = colors.map((item: any) => {
      return { key: item.code, value: item.color };
    });

    const formattedCategories = categories.map((item: any) => {
      return { key: item.code, value: item.category };
    });

    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'name',
        label: 'name',
        required: true,
        value: productObj.product.name,
        order: 1,
      }),

      new SelectInput({
        required: true,
        key: 'brand',
        label: 'brand',
        value: productObj.product.brand,
        options: formattedBrands,
        order: 2,
      }),

      new SelectInput({
        required: true,
        key: 'color',
        label: 'color',
        value: productObj.product.color,
        options: formattedColors,
        order: 3,
      }),

      new TextInput({
        key: 'startingPrice',
        label: 'startingPrice',
        required: true,
        value: productObj.product.startingPrice,
        order: 4,
      }),

      new TextInput({
        key: 'listedPrice',
        label: 'listedPrice',
        required: true,
        value: productObj.product.listedPrice,
        order: 5,
      }),

      new SelectInput({
        required: true,
        key: 'type',
        label: 'type',
        value: productObj.product.type,
        options: [
          { key: 'M', value: 'M' },
          { key: 'W', value: 'W' },
        ],
        order: 6,
      }),

      new MultiLine({
        key: 'descriptionIt',
        label: 'descriptionIt',
        required: true,
        value: productObj.product.descriptionIt,
        order: 7,
      }),

      new MultiLine({
        key: 'descriptionEng',
        label: 'descriptionEn',
        required: true,
        value: productObj.product.descriptionEng,
        order: 8,
      }),

      new SelectInput({
        required: true,
        key: 'category',
        label: 'category',
        value: productObj.product.category,
        options: formattedCategories,
        order: 9,
      }),

      new AddProductSizeInput({
        key: 'productDetails',
        required: true,
        value: productObj.productDetails,
        order: 10,
        options: formattedSizes,
      }),

      new ImagePicker(
        {
          key: 'productImages',
          label: 'Product Images',
          required: true,
          value: productObj.productImages,
          order: 11,
        },
        { minNumber: 3 }
      ),
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
        required: false,
        value: '',
        order: 1,
      }),

      // new TextInput({
      //   key: 'searchProducById',
      //   label: 'Search Product By ID',
      //   required: true,
      //   value: '',
      //   order: 1,
      // }),

      new OrderInput({
        key: 'orderId',
        label: 'Order Id',
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
        required: false,
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
        key: 'instructions',
        label: 'Instructions',
        required: false,
        value: personalAddreddData?.instructions,
        order: 1,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
