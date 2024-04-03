import './featuredProperties.css'
const FeaturedProperties=()=>{
    return (
    <div className='fp'>
        <div className="fpItem">
        <img src="https://i.pinimg.com/originals/c7/af/26/c7af260888ae6f227e6b4f0187d1fe74.jpg" alt="" className="fpImg" />
        <span className="fpName">Ram hotel</span>
        <span className="fpCity">Jodhpur</span>
        <span className="fpPrice">starting from Rs10000</span>
        <div className="fpRating">
            <button>4.5</button>
            <span>Had a great trip with my family! Thankyou yatri for your service!.</span>
            
            </div>   
            </div>
            <div className="fpItem">
            <img src="https://1.bp.blogspot.com/-wI1_Cg8E6hc/XYNX-mnv0GI/AAAAAAAAcVM/6TkfkXTHC9k4Uy2o4tgXDVnVBAm_4-FYACLcBGAsYHQ/w1200-h630-p-k-no-nu/60589637_811040932611687_8072198961894522880_n.png" alt="" className="fpImg" />
        <span className="fpName"> Aram hotel</span>
        <span className="fpCity">Bahu fort</span>
        <span className="fpPrice">starting from 10000</span>
        <div className="fpRating">
            <button>4.4</button>
            <span>Thankyou for providing us best services with your exciting offers!</span>
            </div>
            </div>   
             </div>
             )
}
export default FeaturedProperties;