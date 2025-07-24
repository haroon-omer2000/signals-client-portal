import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/lib/supabase'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { data: client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Client not found' },
          { status: 404 }
        )
      }
      
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch client' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: client,
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    
    // Remove fields that shouldn't be updated directly
    const { id, created_at, updated_at, ...updateData } = body
    
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    // Validate email format if email is being updated
    if (updateData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(updateData.email)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email format' },
          { status: 400 }
        )
      }
      updateData.email = updateData.email.toLowerCase().trim()
    }

    // Trim string fields
    if (updateData.name) updateData.name = updateData.name.trim()
    if (updateData.business_name) updateData.business_name = updateData.business_name.trim()

    const { data: client, error } = await supabase
      .from('clients')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Client not found' },
          { status: 404 }
        )
      }
      
      // Handle unique constraint violation (duplicate email)
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'A client with this email already exists' },
          { status: 409 }
        )
      }
      
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update client' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: client,
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete client' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: null,
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 