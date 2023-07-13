import { ethers } from "ethers";
import { useForm } from "react-hook-form";

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
    console.log("transaction done!");
  };

  //    useEffect(()=>{
  //     const t = ethers.parseEther("10000");
  //     console.log(t);
  //    },[]);

  return (
    <div>
      <form class="form" onSubmit={handleSubmit(onSubmit)}>
        <div class="form-column">
          <label for="name">Name:</label>
          <input {...register("name", { required: true })} />
          <br />
          {errors.name && <span>This field is required</span>}
          <br />
        </div>

        <div class="form-column">
          <label for="message">Message:</label>
          <input {...register("message", { required: true })} />
          <br />
          {errors.message && <span>This field is required</span>}
          <br />
        </div>

        <div class="form-column">
          <label for="amount">Amount:</label>
          <input {...register("amount", { required: true })} />
          <br />
          {errors.amount && <span>This field is required</span>}
          <br />
        </div>

        <input type="submit" value="Pay" />
      </form>
    </div>
  );
};
export default Buy;