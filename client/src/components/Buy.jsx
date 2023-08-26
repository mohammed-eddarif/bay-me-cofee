import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import "./Buy.css";

const Buy = ({ state }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { message, name, amount } = data;
    const { contract } = state;
    const value = { value: ethers.parseEther(amount) };
    const transaction = await contract.buyChai(name, message, value);
    console.log(transaction);
    console.log("transaction done!");
  };

  //    useEffect(()=>{
  //     const t = ethers.parseEther("10000");
  //     console.log(t);
  //    },[]);

  return (
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col ">
        <label htmlFor="name" className="text-base-semibold text-light-2">
          Name:
        </label>
        <input {...register("name", { required: true })} />
        <br />
        {errors.name && <span>This field is required</span>}
        <br />
      </div>

      <div className="flex w-full flex-col ">
        <label htmlFor="amount" className="text-base-semibold text-light-2">
          Amount:
        </label>
        <input {...register("amount", { required: true })} />
        <br />
        {errors.amount && <span>This field is required</span>}
        <br />
      </div>

      <div className="flex w-full flex-col ">
        <label htmlFor="message" className="text-base-semibold text-light-2">
          Message:
        </label>
        <input {...register("message", { required: true })} />
        <br />
        {errors.message && <span>This field is required</span>}
        <br />
      </div>

      <div className="flex justify-center">
        <input
          type="submit"
          value="Pay"
          // not applied !!!
          className="mt-4 w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline cursor-pointer"
        />
      </div>
    </form>
  );
};
export default Buy;
