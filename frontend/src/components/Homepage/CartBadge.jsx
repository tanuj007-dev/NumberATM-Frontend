import { MdOutlineShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';

const CartBadge = () => {
    const cart = useSelector((state) => state.cart.items);
    // console.log(cart)
    const itemCount = cart?.length;

    return (
        <div className="relative flex h-full mr-2 mt-2 items-end self-center">
            <div className='flex items-center'>
                <MdOutlineShoppingCart size={28} className='text-black' />
            </div>
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 transform flex justify-center items-center translate-x-1/2 -translate-y-1/2 min-w-6 min-h-6 bg-orange-500 text-white rounded-full text-center text-xs">
                    {itemCount}
                </span>
            )}
        </div>
    );
};

export default CartBadge;