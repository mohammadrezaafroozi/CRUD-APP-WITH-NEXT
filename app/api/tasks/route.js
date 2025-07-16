import { tasks } from './tasksStore';
export async function POST(request) {
    const { title } = await request.json();
    const newTask = { id: Date.now().toString(), title }; // <-- fixed here
    tasks.push(newTask);
    return new Response(JSON.stringify(newTask), {
        status: 201,
        headers: { 'content-type': 'application/json' }
    });
}
export async function GET() {
    return new Response(JSON.stringify(tasks), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
}