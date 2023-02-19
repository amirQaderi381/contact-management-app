import * as yup from 'yup';

export const contactSchema = yup.object().shape({

    fullname : yup.string().required('نام و نام خانوادگی الزامی است'),
    profile : yup.string().url("آدرس تصویر معتبر نیست").required('تصویر الزامی است'),
    phone_number : yup.number().integer().required('شماره موبایل الزامی است'),
    email : yup.string().email('آدرس ایمیل معتبر نیست').required('ایمیل الزامی است'),
    job : yup.string().nullable(),
    group : yup.string().required('انتخاب گروه الزامی است')
});