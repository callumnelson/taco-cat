import { Taco } from "../models/taco.js"

const index = async (req, res) => {
  try {
    const tacos = await Taco.find({})
    res.render('tacos/index', {
      tacos,
      title: 'TACOS 🌮🌮🌮'
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile._id
    req.body.tasty = !!req.body.tasty
    await Taco.create(req.body)
    res.redirect('/tacos')
  } catch (err) {
    console.log(err)
    res.redirect('/tacos')
  }
}

const show = async (req, res) => {
  try {
    const taco = await Taco.findById(req.params.tacoId)
    .populate('owner')
    res.render('tacos/show', {
      taco,
      title: '🌮 show'
    })
  } catch (err) {
    console.log(err)
    res.redirect('/tacos')
  }
}

const flipTasty = async (req, res) => {
  try {
    const taco = await Taco.findById(req.params.tacoId)
    taco.tasty = !taco.tasty
    await taco.save()
    res.redirect(`/tacos/${req.params.tacoId}`)
  } catch (err) {
    console.log(err)
    res.redirect(`/tacos/${req.params.tacoId}`)
  }
}

export {
  index,
  create,
  show,
  flipTasty
}