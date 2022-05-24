import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'r3tlfrp8',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skjPJZgUX0ZklcRtx8gAuNli8E49BGr1213MUgZ7Kdt83ykzetyLwYeBHbwymRn4XJBYv5ruWIG9TjmZvK32tOs94RGzUQTeVvuR46tMdtpbpUkofDD9gKcpsiTxNSiiPrM0sJbgwSRlbBKjrB4AHu5cn97W9THNhsBEzRje2S2BKrk0kgaf',
  useCdn: false,
})
