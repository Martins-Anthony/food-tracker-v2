import { Section } from '@/app/_containers/layout/Section'
import AddProductForm from '../AddProductFrom'
import ProductList from '../ProductList'

const ProductsPage = ({ userId }: { userId: string }) => (
  <Section>
    <h1>Mes Produits</h1>
    <AddProductForm userId={userId} />
    <ProductList userId={userId} />
  </Section>
)

export default ProductsPage
