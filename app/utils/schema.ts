import { company } from '~/data/site'

// Спільні поля Offer для матеріалів (щебінь, пісок тощо), щоб Search Console не скаржився на «Пропозиції від продавців».
// Доставка самоскидом по Вінниці. Google приймає регіон доставки лише на рівні країни,
// тож зона «Вінниця + 30 км» тут не уточнюється. День доставки домовляються: поточний або наступний,
// машина приїжджає протягом того дня (підтверджено власником 20.10.2026).
// Повернення сипучих матеріалів не буває (підтверджено власником 20.10.2026).
export const materialOfferExtras = {
  shippingDetails: {
    '@type': 'OfferShippingDetails',
    shippingRate: { '@type': 'MonetaryAmount', value: company.deliveryFrom, currency: 'UAH' },
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'UA' },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
      transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' }
    }
  },
  hasMerchantReturnPolicy: {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'UA',
    returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted'
  }
}
