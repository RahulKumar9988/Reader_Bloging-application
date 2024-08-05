import z from 'zod';

// -------------------- signup
export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string()
})
// ------------------------signin
export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})
/// ----------------------createblog
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
}) 
// --------------------updateblog
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string()
}) 


export type SignupInput = z.infer<typeof signupInput>; 
export type SigninInput = z.infer<typeof signinInput>; 
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>