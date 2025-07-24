import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/lib/supabase'
import { sendWelcomeEmail } from '@/lib/email'
import { CreateClientFormData } from '@/types/client.types'

export async function GET() {
  try {
    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch clients' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: clients,
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateClientFormData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.business_name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert client into database
    const { data: client, error } = await supabase
      .from('clients')
      .insert([
        {
          name: body.name.trim(),
          email: body.email.toLowerCase().trim(),
          business_name: body.business_name.trim(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      
      // Handle unique constraint violation (duplicate email)
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'A client with this email already exists' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { success: false, error: 'Failed to create client' },
        { status: 500 }
      )
    }

    // Send welcome email
    try {
      await sendWelcomeEmail({
        to: client.email,
        clientName: client.name,
        businessName: client.business_name,
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the client creation if email fails
    }

    return NextResponse.json({
      success: true,
      data: client,
    }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 