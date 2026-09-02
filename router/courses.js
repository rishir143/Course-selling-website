import {Router} from express

const courseRouter = Router()

courseRouter.get("/preview", (req, res) => {
    return res.json({
       message: "View all my courses"
    })
} )

courseRouter.post("/purchases" , (req, res) => {
  return res,json({
    message: "Purchase course end point"
  })
})

export default courseRouter
