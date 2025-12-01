import React, { useContext, useEffect, useState } from 'react'
const PremiumVIPNumbers = React.lazy(() => import('../Homepage/Shop'));
import UserAxiosAPI from '../../api/userAxiosAPI';
import { Appstate } from '../../App';
import { Suspense } from 'react';

export default function NumerologySearch() {
    const { getOptimizedImage } = useContext(Appstate);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const [meta, setMeta] = useState({ title: "", tags: "", description: "" });
    const axios = UserAxiosAPI();
    useEffect(() => {
        window.scrollTo({top:0,behavior:'smooth'})
        axios.get(`/meta/Store`).then(({ data }) => {
            setMeta(data || { title: "", tags: "", description: "" });
        });
    }, []);
    return (
        <>
            <div className=''>
                {meta?.breadcum && <img className='my-3 md:mb-8 w-full' src={getOptimizedImage(meta?.breadcum)} />}
                {/* <CategoryFilter/> */}
                <Suspense fallback={<div className="min-h-[30vh] bg-gray-100 animate-pulse rounded-md" />}>
                    <PremiumVIPNumbers limit={40} />
                </Suspense>
            </div>
        </>
    )
}
