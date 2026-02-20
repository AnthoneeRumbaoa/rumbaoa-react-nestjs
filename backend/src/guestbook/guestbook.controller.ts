import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

// This grabs your secret keys from Vercel
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
);

@Controller('guestbook')
export class GuestbookController {

  @Get()
  async getAll() {
    // Get all messages from Supabase
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    return data || [];
  }

  @Post()
  async create(@Body() entry: { name: string; message: string }) {
    // Save new message to Supabase
    const { data } = await supabase
      .from('guestbook')
      .insert([{ name: entry.name, message: entry.message }])
      .select();
    return data ? data[0] : null;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Delete message from Supabase
    await supabase.from('guestbook').delete().eq('id', id);
    return { success: true };
  }
}