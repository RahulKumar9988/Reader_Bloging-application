import { Triangle } from 'react-loader-spinner';
export const Spinner =()=>{
    return (
        <div>
            <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
        </div>
    )
} 