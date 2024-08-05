import { Body } from "../components/Body"
import { Footer } from "../components/Footer"
import { Msg } from "../components/Msg"
import { Nav } from "../components/Nav"

export const Dashboard = ()=>{
    return(
        <div className="bg-primary h-full w-full md:h-screen">
            
            <Nav/>
            <Msg/>
            <Body/>
            <Footer/>

        </div>
    )
}