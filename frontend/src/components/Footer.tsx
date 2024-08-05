export const Footer =()=>{
    return(
        <div className="flex gap-5 h-15 justify-around items-center border border-black">
            <div className=" flex gap-5" >
                <a href=""><p>Help</p></a>
                <a href=""><p>About</p></a>
                <a href=""><p>Press</p></a>
                <a href=""><p>Blog</p></a>
            </div>
            <div className="flex flex-col gap-0 text-xs md:text-sm md:gap-4 md:flex-row">
                <p>Designed By <span className="font-bold">Rahul :)</span></p>
                <div className="flex gap-2">
                    <a href="https://www.instagram.com/rahul__kumar191?igsh=Z3BkdTJobDV1ZjRr"><img className="h-5" src="./icons8-insta-50.png" alt="insta" /></a>
                    <a href="https://x.com/Rahul_kr_rahul?t=QcAaqwkoAVVWciM4sSgWJA&s=08"><img className="h-5" src="./icons8-x-80.png" alt="X" /></a>
                </div>
            </div>
           
        </div>
    )
}
