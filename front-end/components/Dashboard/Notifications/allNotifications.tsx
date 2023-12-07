
import { contextdata } from '@/app/contextApi';
import {
    useContext, useEffect, useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';

function MyNotif()
{
    const {notifSocket}:any = useContext(contextdata);
    const [myNotif, setMyNotif] = useState<any>([]);
    const router = useRouter();
  
  useEffect(() => {
	  if (!notifSocket) return;
		notifSocket.on('notification', (payload:any) => {
			setMyNotif((prev:any) => [...prev, payload]);
			setTimeout(() => {
			setMyNotif([]);
			}
			, 100);
		})
		notifSocket.on('redirect', (payload:any) => {
			router.push(`${payload.link}`);
		})
		return () => {
			setMyNotif([]);
			notifSocket.off('notification');
      notifSocket.off('redirect');
      notifSocket?.disconnect();
		}
	}
	, [notifSocket]);
  return(
    <>
        <div className='w-full absolute'>
            <Toaster position="top-right"  richColors/>
            {myNotif.length !== 0 && myNotif.map((notif:any, index:number) => (
            <div key={index}>
                
                {notif.type === 'success' && toast.success(notif.message)}
                {notif.type === 'info' && toast.info(notif.message)}
                {notif.type === 'error' && toast.error(notif.message)}
                {notif.type === 'warning' && toast.warning(notif.message)}
            </div>
            ))
            }
        </div>
    </>
  )
}

export default MyNotif