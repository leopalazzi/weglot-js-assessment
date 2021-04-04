// Use await + destructuration

function Employee({ id }) {
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const [employee, setEmployee] = useState({});

   useEffect(() => {
      try{
         const employee = await getEmployee(id);
         setEmployee(employee);
         setLoading(false);
      }catch(e){
         setError('Unable to fetch employee');
            setLoading(false);

      }
   }, [id]);

   if (error) {
      return <Error />;
   }

   if (loading) {
      return <Loading />;
   }

   const {firstName,lastName,position,salary,yearHired,wololo}

   return (
      <Table>
         <Row>
            <Cell>{firstName}</Cell>
            <Cell>{lastName}</Cell>
            <Cell>{position}</Cell>
            <Cell>{project}</Cell>
            <Cell>{salary}</Cell>
            <Cell>{yearHired}</Cell>
            <Cell>{wololo}</Cell>
         </Row>
      </Table>
   );
}