// src/app/api/fichas/[id]/route.js
import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const docRef = dbAdmin.collection("fichas").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "Ficha não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() }, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar ficha via API:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}


export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    
    const body = await request.json(); 

    const docRef = dbAdmin.collection("fichas").doc(id);
    
    await docRef.update({
      ficha: body.ficha
    });

    return NextResponse.json({ sucesso: true }, { status: 200 });

  } catch (error) {
    console.error("Erro ao atualizar ficha via API:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}