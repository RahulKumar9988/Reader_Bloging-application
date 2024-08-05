import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@rahulrola/medium-common"


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    },
    Variables:{
        userId: string;
    }
}>();

blogRouter.use("/*", async(c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    try{
        
        if(user){
            c.set("userId", user.id as string);
            await next();
        
        }
        else{
            c.status(403) //unauthorized
            c.json({
                msg: "You are not logged in"
            })
        }
    }catch(e){
        return c.json({
            status: "error",
            message: "Invalid token"
        })
    }

});

blogRouter.post('/',async(c)=>{
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        return c.json({
            status: 411,
            message: "Invalid_bloginput_input"
        })
    }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        
        const blog = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        })
        console.log(blog.id);
        
        return c.json({
            id:blog.id
        })
    }catch{
        return c.json({
            message:'failed to create blog'
        })
    }
  });
  
  blogRouter.put('/', async(c)=>{
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        return c.json({
            status: 411,
            message: "Invalid_blogupdate_input"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.update({
            where:{
                id:body.id, 
            },
            data:{
                title: body.title,
                content: body.content,
            }
        })
    
        return c.json({
            id:blog.id
        })
    }catch(e){
        return c.json({
            message:"update failde"
        })
    }

  });
  
  blogRouter.get('/bulk',async(c)=>{ 
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select: {
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }

        }
    });
    
    return c.json({blogs});
  });

  blogRouter.get('/:id', async(c)=>{
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.findFirst({
            where:{
                id:Number(id)
            },
            select:{
                id:true,
                title: true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
    
        return c.json({
            blog
        })
    }catch(e){
        return c.json({
            message:"unable to get data"
        })
    }
  });
  
  // pagination...
 