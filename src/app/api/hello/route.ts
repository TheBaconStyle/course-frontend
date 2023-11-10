import { NextResponse } from 'next/server'
// import { cache } from 'react'
// import { api } from '../../http/server'

export async function GET() {
  // const text = await (await fetch('http://localhost:3000/api')).text
  // console.log(text)
  return new NextResponse('Hello world')
}
