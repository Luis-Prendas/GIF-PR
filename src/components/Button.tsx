export default function Button ({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-5 py-2.5 text-center flex gap-2 justify-center items-center text-xl">{children}</button>
  )
}
