import {create} from 'zustand';
import {useState} from 'react';

type UserStore = {
    name: string,
    setName: (newName: string) => void,
}

const useUserStore = create<UserStore>((set) => ({
    name: 'Alice',
    setName: (newName) => set({name: newName}),
}));

function Header() {
    const name = useUserStore((state) => state.name)
    return (
        <h1>Welcome, {name}</h1>
    );
}

function Settings() {
    const {name, setName} = useUserStore();
    const [inputValue, setInputValue] = useState(name)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setName(inputValue);
    };

    return (
        <form onSubmit={ handleSubmit }>
            <input type="text"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

function App() {
    return (
        <div>
            <Header/>
            <Settings/>
        </div>
    )
}

export default App;
