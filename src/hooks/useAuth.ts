import { useEffect } from 'react';
import { useAppDispatch } from '@/src/hooks/hook';
import { login } from '@/src/slices/authSlice';
import { setCart } from '@/src/slices/cartSlice';
import { showPopup } from '@/src/slices/message';
import { clientLinks, httpClient } from '@/src/utils';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const fetchCart = async () => {
    try {
      const response = await httpClient.get({ url: clientLinks.cart.cart });
      const result = response.data?.data;

      if (result) {
        const { items, totalPrice } = result;
        dispatch(setCart({ items, totalPrice }));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      dispatch(showPopup({
        message: "Failed to load cart data.",
        type: "error",
      }));
    }
  };

  useEffect(() => {
    const handleLoginSuccess = () => {
      dispatch(login());
      fetchCart();
      dispatch(showPopup({
        message: "Login successfully!",
        type: "success",
      }));
    };

    window.addEventListener('loginSuccess', handleLoginSuccess);

    return () => {
      window.removeEventListener('loginSuccess', handleLoginSuccess);
    };
  }, [dispatch]);

  return { fetchCart };
};
