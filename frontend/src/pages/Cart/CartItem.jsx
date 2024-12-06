import { Chip, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CartItem = () => {
  // Dynamically define the chip labels
  const chipLabels = ["Lean Ground Beef", "Chicken Breast", "Tofu"];

  return (
    <div className='px-5'>
      <div className='lg:flex items-center lg:space-x-5'>
        <div>
          <img
            className='w-[5rem] h-[5rem] object-cover'
            src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Taco"
          />
        </div>
        <div className='flex items-center justify-between lg:w-[70%]'>
          <div className='space-y-1 lg:space-y-3 w-full'>
            <p>Taco</p>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-1'>
                <IconButton>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <div className='w-5 h-5 text-xs flex items-center justify-center'>
                  {5}
                </div>
                <IconButton>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <p className='flex gap-1'><span>Rwf. </span>2500.00</p>
        </div>
      </div>

      {/* Dynamically rendered Chips */}
      <div className='pt-3 space-x-2'>
        {
          chipLabels.map((label, index) => (
            <Chip key={index} label={label} />
          ))
        }
      </div>
    </div>
  );
}

export default CartItem;
