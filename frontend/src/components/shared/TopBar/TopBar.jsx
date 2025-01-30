import { Flex, Text } from '@mantine/core';
import classes from './Header.module.css';
import { useRouteMetadata } from '../../../utility';


export default function Header() {
    const pageName = useRouteMetadata();


    return (
        <header className={classes.header}>
            <Flex size="lg" className={classes.inner}>
                <Text>{pageName}</Text>
            </Flex>
        </header>
    );
}