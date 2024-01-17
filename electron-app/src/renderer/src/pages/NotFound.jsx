import Cover from '../assets/cloud-iot-cover.png'

const NotFound = () => {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark min-h-fit">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="my-4 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Dashboard not implemented
              </h2>
              <img src={Cover} className="h-64 m-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
