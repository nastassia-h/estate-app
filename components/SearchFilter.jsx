import React from 'react'
import { useEffect, useState } from 'react'
import { Flex, Text, Spinner, Button, Box, Select, Icon, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'
import { filterData, getFilterValues, } from '../utils/filterData'
import { baseUrl, fetchApi } from '../utils/fetchApi'
import noresult from '../assets/images/noresult.webp'

const SearchFilter = () => {
   const [inputValue, setInputValue] = useState('')
   const [loading, setLoading] = useState(false);
   const [filters, setFilters] = useState(filterData);
   const [showLocations, setShowLocations] = useState(false)
   const [locationData, setLocationData] = useState();
   const [searchTerm, setSearchTerm] = useState('');
   const router = useRouter()
   const searchProperties = (filterValues) => {
      const path = router.pathname;
      const { query } = router;

      const values = getFilterValues(filterValues);
      values.forEach((item) => {
         if (item.value && filterValues?.[item.name]) {
            query[item.name] = item.value
         }
      })

      router.push({ pathname: path, query })
   }

   useEffect(() => {
      if (searchTerm !== '') {
         const fetchData = async () => {
            setLoading(true)
            const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
            setLoading(false)
            setLocationData(data?.hits);
         };

         fetchData();
      }
   }, [searchTerm])


   return (
      <Flex color='grey.100' p='4' justifyContent={'center'} flexWrap='wrap'>
         {filters.map(filter =>
            <Box key={filter.queryName}>
               <Select
                  placeholder={filter.placeholder}
                  w='fit-content'
                  p='2'
                  onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}>
                  {filter?.items?.map(item =>
                     <option key={item.value} value={item.value}>{item.name}</option>
                  )}
               </Select>
            </Box>
         )}
         <Flex flexDir='column'>
            <Button m='2' onClick={() => setShowLocations(!showLocations)}>Search location</Button>
            {showLocations && (
               <Flex flexDir='column' pos='relative' paddingTop='2'>
                  <Flex flexDir={'column'} gap={5} alignItems={'center'}>
                     <Input
                        variant={'outline'}
                        placeholder='Location...'
                        size='sm'
                        value={inputValue}
                        w='300px'
                        focusBorderColor='gray.300'
                        onChange={(e) => setInputValue(e.target.value)}
                     >
                     </Input>
                     <Button style={{ backgroundColor: 'lightgreen' }} w='70px' onClick={() => setSearchTerm(inputValue)}>GO!</Button>
                  </Flex>
                  {inputValue !== '' && (
                     <Icon
                        as={MdCancel}
                        pos='absolute'
                        cursor='pointer'
                        right='0'
                        top='4'
                        zIndex='100'
                        onClick={() => setInputValue('')}
                     />
                  )}
                  {loading && <Spinner margin='auto' marginTop='3' />}
                  {showLocations && (
                     <Box marginTop='3' height='300px' overflow='auto'>
                        {locationData?.map((location) => (
                           <Box
                              key={location.id}
                              onClick={() => {
                                 searchProperties({ locationExternalIDs: location.externalID });
                                 setShowLocations(false);
                                 setSearchTerm(location.name);
                              }}
                           >
                              <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100' >
                                 {location.name}
                              </Text>
                           </Box>
                        ))}
                        {!loading && !locationData?.length && (
                           <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                              <Image src={noresult} height={200} />
                              <Text fontSize='xl' marginTop='3'>
                                 Waiting to search!
                              </Text>
                           </Flex>
                        )}
                     </Box>
                  )}
               </Flex>
            )}
         </Flex>
      </Flex >
   )
}

export default SearchFilter
