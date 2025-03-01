import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import Footer from '../../Components/Footer/Footer'
import LatestProudects from '../../Components/LatestProudects/LatestProudects'
import MainSlider from '../../Components/MainSlider/MainSlider'
export default function Home() {
  return (
    <div>
      <MainSlider />
      <CategorySlider />
    <LatestProudects/>
  <Footer />

    </div>
  )
}
