// Future Supabase content shape. This is documentation/example data only.
export const contentSchema = {
  department: { id: 'uuid', name: 'string' },
  course: { id: 'uuid', department_id: 'uuid', code: 'string', name: 'string' },
  topic: { id: 'uuid', course_id: 'uuid', title: 'string', explanation: 'string' },
  lesson: { id: 'uuid', topic_id: 'uuid', title: 'string', body: 'string' },
  question: { id: 'uuid', topic_id: 'uuid', prompt: 'string', options: 'json', answer: 'number' },
  progress: { user_id: 'uuid', topic_id: 'uuid', percent: 'number' },
  project: { id: 'uuid', user_id: 'uuid', title: 'string', status: 'string', description: 'string' }
};
