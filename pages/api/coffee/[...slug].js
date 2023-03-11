// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    // console.log({ req, res });
    res.status(200).json({ name: 'Catch All' })
}

// if we include a simple store.js file in this coffee directory
// then if we go to localhost:3000/api/coffee/store
// then the response in store.js file will be returned 
// since the priority of individual file is greater