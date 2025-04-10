
import Stripe from "stripe"
import config from "../../config"

const stripe = new Stripe(config.stripe_secret as string)

export const makePayment = async(productName:string, price:number, customer_email:string, productId:string)=>{
    const product = await stripe.products.create({
        name:productName,
    })
    if(product){
        const prices = await stripe.prices.create({
            product:product.id,
            unit_amount:price,
            currency:"USD"
        })
    if(prices.id){
        const session = await stripe.checkout.sessions.create({
            line_items:[
                {
                    price:`${prices.id}`,
                    quantity:1,
                }
            ],
            mode:"payment",
            success_url:`https://bi-cycle-store-shad-cn.vercel.app/payment-success?session_id={CHECKOUT_SESSION_ID}&product=${productId}`,
            cancel_url:"http://localhost:5173/payment-failed",
            customer_email
        })
        return session
    }

    }
    
}


export const verifyPaymentUtility = async(sessionId:string)=>{
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session
}

