import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/animation/Loading1.webm"
import { ChevronLeft } from 'lucide-react'
import axios from 'axios'
import ProductListView from "../components/ProductListView";


const CategoryProduct = () => {
    const params = useParams()
    const category = params.category
    const [searchData, setSearchData] = useState([])
    const navigate = useNavigate();

    const getFilterData = async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.in/api/products/category?type=${category}`) 
            const data = response.data.products
            setSearchData(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFilterData()
        window.scrollTo(0,0)
    }, [])

  return (
      <div>
          {
              searchData.length > 0 ? (
               <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
                      <button onClick={() => navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft /> Back</button>
                      {
                          searchData.map((product, index) => {
                              return <ProductListView key={index} product={ product} />
                          })
                      }
                  </div> 
              ):(
                  <div className='flex items-center justify-center h-[480px]'>
                    <video muted autoPlay loop>
                              <source src={ Loading } type = 'video/webm'/>
                    </video>
                  </div> 
              )
          }
      </div>
  )
}

export default CategoryProduct