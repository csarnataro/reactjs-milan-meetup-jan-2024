import Cover from '../assets/cloud-iot-cover.png'
import Versions from '../components/Versions'

const Home = () => {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark min-h-fit">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div
              style={{ height: 'calc(100vh - 140px)' }}
              className="w-full p-4 sm:p-12.5 xl:p-17.5"
            >
              <h2 className="my-4 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Welcome to Arduino Dashboard for Desktop
              </h2>
              <img src={Cover} className="h-64 m-auto" />
            </div>
            <Versions />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
