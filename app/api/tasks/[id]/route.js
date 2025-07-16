import { NextResponse } from 'next/server';
import { tasks } from '../tasksStore';

// DELETE /api/tasks/[id]
export async function DELETE(request, { params }) {
    const { id } = params;
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    tasks.splice(index, 1);
    return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
}

// PUT /api/tasks/[id]
export async function PUT(request, { params }) {
    const { id } = params;
    const { title } = await request.json();
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    task.title = title;
    return NextResponse.json(task, { status: 200 });
}