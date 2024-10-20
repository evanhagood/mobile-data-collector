import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

export default function Search() {
    const [comments, setComments] = useState('');
    
    return (
        <motion.div>
            <TextInput
                prompt="Search Database:"
                placeholder="Example: ASTI+A1B2"
                value={comments}
                setValue={setComments}
            />
            <Button 
                prompt="Search" 
                
            />
        </motion.div>
        
    );
}
