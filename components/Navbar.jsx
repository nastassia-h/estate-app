import React from 'react'
import { Link } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react'
import { FcMenu, FcHome, FcAbout, FcSearch } from 'react-icons/fc'
import { BsSearch } from 'react-icons/bs'
import { FiKey } from 'react-icons/fi'

const Navbar = () => {
   return (
      <Flex p='2' borderBottom={'1px'} borderColor='gray.100'>
         <Box fontSize={'3xl'} color='blue.400' fontWeight={'bold'}>
            <Link href='/' paddingLeft='2'>Realtor</Link>
         </Box>
         <Spacer />
         <Box>
            <Menu>
               <MenuButton as={IconButton} icon={<FcMenu />} variant='outlined' color='red.400' />
               <MenuList>
                  <Link href='/' passhref>
                     <MenuItem icon={<FcHome />}>Home</MenuItem>
                  </Link>
                  <Link href='/search' passhref>
                     <MenuItem icon={<FcSearch />}>Search</MenuItem>
                  </Link>
                  <Link href='/search?purpose=for-sale' passhref>
                     <MenuItem icon={<FcAbout />}>Sale Property</MenuItem>
                  </Link>
                  <Link href='/search?purpose=for-rent' passhref>
                     <MenuItem icon={<FcHome />}>Rent Property</MenuItem>
                  </Link>
               </MenuList>
            </Menu>
         </Box>
      </Flex>
   )
}

export default Navbar