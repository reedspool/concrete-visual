import React, { useEffect } from 'react';
import Head from 'next/head'
import Layout from '../components/layout'
import { Workspace } from "../components/Workspace";
import { Machine } from "xstate";
import { Context } from "../core/CoreMachine";

export default function Home() {
  const Provider = Context.provide();

  return (
    <Layout>
      <Head>
        <title>Concrete Visual Environment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider>
        <main className="h-full w-full lg:w-2/3 lg:mx-auto p-5 bg-gray-200 leading-loose">
          <Context.Visible when="workspace.live"><Workspace /></Context.Visible>
        </main>
      </Provider>
    </Layout>
  )
}
