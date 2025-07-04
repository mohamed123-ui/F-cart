import { Helmet } from 'react-helmet'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import Footer from '../../Components/Footer/Footer'
import LatestProudects from '../../Components/LatestProudects/LatestProudects'
import MainSlider from '../../Components/MainSlider/MainSlider'
export default function Home() {
  return (
    <div>
       <Helmet>
        <title>home </title>
        <meta
          name="description"
          content="Log in to  account to view your orders, cart, and personal settings."
        />
        <meta
          name="keywords"
          content="home, sign in, ecommerce home, user home"
        />
        <meta property="og:title" content="home to Your Account" />
        <meta
          property="og:description"
          content="Access your personal dashboard and continue shopping ."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <MainSlider />
      <CategorySlider />
    <LatestProudects/>
  <Footer />

    </div>
  )
}
