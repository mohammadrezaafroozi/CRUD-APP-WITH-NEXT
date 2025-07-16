'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const router = useRouter();
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(!title) return;
        const response = await fetch('/api/tasks',{
            method: 'POST',
            headers:{ 'content-type': 'application/json'},
            body: JSON.stringify({title}),
        })
        if(response.ok){
            router.push('/');
            
        } else{
            alert('Failed to create task')
        }
    }
    
    return (
        <div>
            <h1 className='bg-amber-500 text-3xl text-center rounded-2xl '>create task</h1>
            <form onSubmit={handleSubmit}>
               <input className='p-2 bg-[#646427] rounded-l-3xl  mt-4 text-center' type="text" value={title} onChange={ (event)=> setTitle(event.target.value) } placeholder='task title' />
               <button className='ml-2 cursor-pointer bg-amber-500 p-2 rounded-r-3xl' type='submit'>create</button>
            </form>
            
        </div>
    );
};

export default CreateTask;