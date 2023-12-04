
import {
   
    CloudArrowUpIcon,
    LockClosedIcon,
    ArrowPathIcon,
    FingerPrintIcon
  } from '@heroicons/react/24/outline'


const features = [


    {
      name: 'Individual approach',
      description:
        'Individual approach to each partner depending on the needs of the activity',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Tanks for your needs',
      description:
        'Tanks with different equipment for transporting fuel to your base',
      icon: LockClosedIcon,
    },
    {
      name: 'Track your fuel consumption',
      description:
        'A system to track your fuel consumption and vehicle mileage',
      icon: ArrowPathIcon,
    },
    {
      name: 'High-quality gasoline',
      description:
        'High-quality gasoline and diesel, meeting all requirements',
      icon: FingerPrintIcon,
    },
  ]




export default function HomeFeatured () {
    return (
        <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            WE - YOU - THE FUEL
            </p>
           
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-16 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
}